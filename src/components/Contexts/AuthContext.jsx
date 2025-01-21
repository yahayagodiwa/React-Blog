import { createContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
export const userContext = createContext(null);
const AuthContext = ({ children }) => {
  const projectUrl = "https://zbdxukjrqoichjwompwi.supabase.co";
  const projectKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZHh1a2pycW9pY2hqd29tcHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjgzNjUsImV4cCI6MjA1MjM0NDM2NX0.P8LWvjS79J5VAeY8XYYpEm14IrWmsJUUngJb6LP18nk'
  const supabase = createClient(projectUrl, projectKey);
  const token = localStorage.getItem("token")
const [user, setUser] = useState(null);
  useEffect(() => {
    if (token) {
      // Fetch user data using token
      supabase.auth.getUser().then(({ data }) => {
        setUser(data.user);
      });
    }
  }, [token]);

  const contextvalue = {
    supabase,
    token,
    user,
  };

  return (
    <userContext.Provider value={contextvalue}>{children}</userContext.Provider>
  );
};

export default AuthContext;
