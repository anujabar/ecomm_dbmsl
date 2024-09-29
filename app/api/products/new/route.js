import db from "@/db/PrismaClient";
import { bucket } from "@/db/firebase";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';



const uploadImage = async (file) => {
    console.log('File object:', file); 
    const uniqueFileName = `${uuidv4()}.${file.name.split('.').pop()}`;
    const blob = bucket.file(uniqueFileName);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.type,
      },
    });
  
    return new Promise(async(resolve, reject) => {
      blobStream.on('error', (err) => {
        console.error(`Upload error: ${err}`);
        reject(err);
      });
  
      blobStream.on('finish', async () => {
        try {
          await blob.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          console.log(publicUrl);
          resolve(publicUrl);
        } catch (error) {
          reject(error);
        }
      });
  
     
      const buffer = Buffer.from(await file.arrayBuffer()); // Convert to Buffer
      blobStream.end(buffer); 
    });
  };
  
export async function POST(req) {
    const formData = await req.formData();
    console.log(formData)
    const title = formData.get('title');
    const price = formData.get('price');
    const category = formData.get('category');
    const salePercentage = formData.get('salePercentage');
    const quantity = formData.get('quantity');
    const description = formData.get('description');
    const seller = formData.get('seller')
  
    const images = formData.getAll('images'); // Handles multiple files
  
    if (!images.length || !title || !price || !category) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
  
    try {
      const uploadPromises = images.map(uploadImage);
      const imageUrls = await Promise.all(uploadPromises);
  
      const result = await db.product.create({
        data:{
        title,
        price,
        images: imageUrls.join(','), 
        category,
        salePercentage: parseFloat(salePercentage) || 0,
        stars: 0,
        quantity: parseInt(quantity) || 0,
        seller: Number(seller),
        description,
    }});
  
      return NextResponse.json({ message: 'Product uploaded successfully', productId: result.id }, { status: 200 });
    } catch (error) {
      console.error('Failed to upload images and create product:', error);
      return NextResponse.json({ message: 'Failed to upload images and create product', error: error.message }, { status: 500 });
    }
  }