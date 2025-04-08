export function getBaseUrl() {
    if (typeof window !== 'undefined') {
      // client-side
      return '';
    }
  
    // server-side
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  }
  