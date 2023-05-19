document.addEventListener("DOMContentLoaded", function() {
  var voteButtons = document.getElementsByClassName("vote-button");
  var countdown = document.getElementById("countdown");
  var countdownTimer;
  var votingEnabled = true;
  var voteRecords = [];

  for (var i = 0; i < voteButtons.length; i++) {
    voteButtons[i].addEventListener("click", function() {
      if (votingEnabled) {
        var candidateName = this.parentNode.querySelector("p").textContent;
        var voteRecord = { candidate: candidateName, timestamp: new Date() };
        voteRecords.push(voteRecord);
        console.log(voteRecord);

        displayVoteRecords(); // Mostrar los registros de votos actualizados
        startCountdown();
        votingEnabled = false;
        this.disabled = true;
        this.style.backgroundColor = "gray";
      }
    });
  }

  function startCountdown() {
    var seconds = 30;
    countdown.style.display = "block";
    countdown.innerHTML = seconds;

    countdownTimer = setInterval(function() {
      seconds--;
      countdown.innerHTML = seconds;

      if (seconds <= 0) {
        clearInterval(countdownTimer);
        countdown.style.display = "none";
        resetVotingButtons();
      }
    }, 1000);
  }

  function resetVotingButtons() {
    votingEnabled = true;
    for (var i = 0; i < voteButtons.length; i++) {
      voteButtons[i].disabled = false;
      voteButtons[i].style.backgroundColor = "#4CAF50";
    }
  }

  function displayVoteRecords() {
    var voteRecordsContainer = document.getElementById("vote-records");
    voteRecordsContainer.innerHTML = ""; // Limpiar el contenido actual

    if (voteRecords.length === 0) {
      voteRecordsContainer.innerHTML = "No hay votos registrados.";
      return;
    }

    var recordsList = document.createElement("ul");
    for (var i = 0; i < voteRecords.length; i++) {
      var recordItem = document.createElement("li");
      recordItem.textContent = voteRecords[i].candidate + " - " + voteRecords[i].timestamp;
      recordsList.appendChild(recordItem);
    }

    voteRecordsContainer.appendChild(recordsList);
  }

  // Llamada a la función para mostrar los registros de votos inicialmente
  displayVoteRecords();
});
