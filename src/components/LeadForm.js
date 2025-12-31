const handleSubmit = async (e) => {
    e.preventDefault();
  
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        email,
        company,
        source
      })
    });
  };