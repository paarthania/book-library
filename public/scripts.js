document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("search-button")
    .addEventListener("click", function () {
      const query = document.getElementById("book-search").value;
      fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      )
        .then((response) => response.json())
        .then((data) => {
          let searchHtml = "";
          const books = data.docs.slice(0, 10); // Display only the first 10 results
          books.forEach((book, index) => {
            const title = book.title || "No title available";
            const author = book.author_name
              ? book.author_name[0]
              : "No author available";
            const coverId = book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
              : "";
            const publishYear = book.first_publish_year || "Unknown";

            // Add the book HTML with a unique data attribute for each "Add" button
            searchHtml += `
                    <div class="book-item" data-index="${index}">
                        <img src="${coverId}" alt="${title} cover" class="book-cover">
                        <div class="title">${title}</div>
                        <div class="author">${author}</div>
                        <div class="year">${publishYear}</div>
                        <div class="add-button" data-title="${title}" data-author="${author}" data-year="${publishYear}" data-cover="${coverId}">
                            <span>+</span>
                        </div>
                    </div>
                `;
          });

          document.getElementById("book-results").innerHTML = searchHtml;

          // Attach event listeners to all "Add" buttons after rendering the search results
          document.querySelectorAll(".add-button").forEach((button) => {
            button.addEventListener("click", function () {
              const title = this.getAttribute("data-title");
              const author = this.getAttribute("data-author");
              const year = this.getAttribute("data-year");
              const coverUrl = this.getAttribute("data-cover");

              // Prepare the data object to be sent to the backend
              const bookData = {
                name: title,
                author: author,
                publish_year: year,
                cover_url: coverUrl,
              };

              // Send a POST request to add the book to the backend
              fetch("http://localhost:3000/api/books", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(bookData),
              })
                .then((response) => response.json())
                .then((result) => {
                  console.log("Book added:", result);
                  showSuccessMessage(
                    "Book successfully added to your library!"
                  );
                })
                .catch((error) => {
                  console.error("Error adding book:", error);
                });
            });
          });
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
        });
    });

  // Function to show a success message
  function showSuccessMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.className = "message show";
    messageElement.textContent = message;
    document.body.appendChild(messageElement);

    setTimeout(() => {
      messageElement.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(messageElement);
      }, 500);
    }, 3000);
  }

  function loadLibraryBooks() {
    fetch("http://localhost:3000/api/books")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Library books:", data); // Log the data for debugging
        let libraryHtml = "";
        data.forEach((book) => {
          const title = book.name || "No title available";
          const author = book.author || "No author available";
          const coverUrl = book.cover_url || ""; // Fallback if no cover
          const publishYear = book.publish_year || "Unknown";
          const bookId = book.id; // Assuming the backend returns an `id`

          libraryHtml += `
                    <div class="book-item">
                        <img src="${coverUrl}" alt="${title} cover">
                        <div class="title">${title}</div>
                        <div class="author">${author}</div>
                        <button class="delete-button" data-id="${bookId}">
                            −
                        </button>
                    </div>
                `;
        });
        document.getElementById("library-results").innerHTML = libraryHtml;
      })
      .catch((error) => {
        console.error("Error fetching library books:", error); // Log any errors
        document.getElementById("library-results").innerHTML =
          "<p>Error loading books.</p>";
      });
  }

  // Handle the delete book event in the library
  document
    .getElementById("library-results")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("delete-button")) {
        const bookId = event.target.dataset.id;

        fetch(`http://localhost:3000/api/books/${bookId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to delete book");
            }
            console.log("Book deleted successfully");
            // Optionally show a message or just reload the library
            loadLibraryBooks(); // Reload the library after deletion
          })
          .catch((error) => {
            console.error("Error deleting book:", error);
          });
      }
    });

  // Load library books on page load
  loadLibraryBooks();
});
