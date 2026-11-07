(() => {
  // Special offer progress/notifications (mantido do HTML original, mas consolidado aqui).
  const initSpecialOffer = () => {
    const spotsElement = document.getElementById("spots");
    const spotsTextElement = document.getElementById("spots-text");
    const progressBar = document.getElementById("progress-bar");
    const specialOfferSection = document.getElementById("special-offer");

    if (!spotsElement || !spotsTextElement || !progressBar || !specialOfferSection) return;

    let spotsClaimed = 1;
    const totalSpots = 10;
    let isSixClaimed = false;
    let isVisible = false;
    let intervalId = null;

    const showPurchaseNotification = () => {
      const notificationDiv = document.createElement("div");
      notificationDiv.style.position = "fixed";
      notificationDiv.style.bottom = "-100px";
      notificationDiv.style.right = "20px";
      notificationDiv.style.backgroundColor = "#79d25d";
      notificationDiv.style.color = "white";
      notificationDiv.style.padding = "15px";
      notificationDiv.style.fontSize = "1rem";
      notificationDiv.style.display = "block";
      notificationDiv.style.borderRadius = "10px";
      notificationDiv.style.boxShadow = "0 4px 8px rgba(0,0,0,0.5)";
      notificationDiv.style.maxWidth = "300px";
      notificationDiv.style.textAlign = "center";
      notificationDiv.style.zIndex = "1000";
      notificationDiv.style.transition = "bottom 0.5s ease-in-out";

      const notifications = [
        "<span style='font-weight:700'>Jack Thomas, from Birmingham</span>, purchased 6 bottles",
        "<span style='font-weight:700'>Henry Harris, from Leeds</span>, purchased 6 bottles",
        "<span style='font-weight:700'>Oliver Smith, from London</span>, purchased 6 bottles",
        "<span style='font-weight:700'>Ethan Clark, from Sydney</span>, purchased 3 bottles",
        "<span style='font-weight:700'>William Johnson, from New York</span>, purchased 3 bottles",
        "<span style='font-weight:700'>Daniel Martinez, from Los Angeles</span>, purchased 6 bottles",
      ];

      notificationDiv.innerHTML = notifications[Math.floor(Math.random() * notifications.length)];
      document.body.appendChild(notificationDiv);

      // trigger transition
      requestAnimationFrame(() => {
        notificationDiv.style.bottom = "20px";
      });

      setTimeout(() => {
        notificationDiv.style.bottom = "-100px";
        setTimeout(() => notificationDiv.remove(), 700);
      }, 5000);
    };

    const increaseSpots = () => {
      if (!isVisible) return;

      if (spotsClaimed < totalSpots && !isSixClaimed) {
        spotsClaimed += 1;
        spotsElement.textContent = `${spotsClaimed}/10`;
        progressBar.style.width = `${(spotsClaimed / totalSpots) * 100}%`;

        if (spotsClaimed === 6) {
          isSixClaimed = true;
          spotsElement.innerHTML = "<strong>6/10</strong>";
          spotsTextElement.textContent = "6/10 claimed!";
          if (intervalId) clearInterval(intervalId);
          return;
        }

        showPurchaseNotification();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (isVisible) return;
          isVisible = true;
          intervalId = setInterval(increaseSpots, 8000);
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(specialOfferSection);
  };

  document.addEventListener("DOMContentLoaded", () => {
    initSpecialOffer();
  });
})();

