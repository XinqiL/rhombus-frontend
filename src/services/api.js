export function generateRegex(description, fileUrl) {
  const apiUrl = `${import.meta.env.VITE_API_URL}/generate-regex`;
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
    .then((response) =>
      response.json().then((data) => {
        if (!response.ok) {
          throw new Error(data.error || "Unknown server error");
        }
        return data;
      })
    )
    .catch((error) => {
      console.error("Fetch error:", error.message);
      throw error;
    });
}
