import React, { useState, useEffect, useCallback, Suspense } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import SignUp from "./SignUp.jsx";
import SignIn from "./SignIn.jsx";

export default function Auth() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [message, setMessage] = useState({
    message: "",
    styles: ""
  });
  const [isNew, setIsNew] = useState(false);

  const handleInputChange = useCallback(
    (field, value) =>
      setFormData({
        ...formData,
        [field]:
          field === "username" ? value.toLowerCase().replace(/\s+/g, "") : value
      }),
    [formData]
  );

  return (
    <SafeAreaView>
      {isNew ? (
        <SignUp
          handleInputChange={handleInputChange}
          formData={formData}
          message={message}
          setMessage={setMessage}
          setIsNew={setIsNew}
        />
      ) : (
        <SignIn
          handleInputChange={handleInputChange}
          formData={formData}
          message={message}
          setMessage={setMessage}
          setIsNew={setIsNew}
        />

      )}
    </SafeAreaView>
  );
}
