

const NotAuthorized = () => {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600">403 - Not Authorized</h1>
          <p className="text-lg mt-4">You do not have permission to access this page.</p>
          <a href="/" className="text-blue-500 mt-6 inline-block">Go back to Home</a>
        </div>
      </div>
    );
  };
  
  export default NotAuthorized;
  