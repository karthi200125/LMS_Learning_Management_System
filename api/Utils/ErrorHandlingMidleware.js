export const handleError = (err, req, res, next) => {
    const status = err.status || 500;
    const errorMessage = err.message || "Something Went Wrong";
    const errorStack = err.stack || "Internal Server Error";
  
    res.status(status).json({
      success: false,
      status,
      message: errorMessage,
      stack: errorStack,
    });
  };
  