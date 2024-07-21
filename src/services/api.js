export function generateRegex(description, fileUrl) {
  const apiUrl = "/api/generate-regex";
  const data = {
    description: description,
    file_url: fileUrl,
  };

  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(`HTTP Status Code: ${response.status}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
