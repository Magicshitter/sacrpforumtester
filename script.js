document.getElementById("forumForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const submitButton = document.querySelector("button[type='submit']");
  submitButton.classList.add('buttonRainbow');

  setTimeout(function() {
    submitButton.style.backgroundColor = getComputedStyle(submitButton).backgroundColor;
    submitButton.classList.remove('buttonRainbow');
  }, 2000);

  let ownerPingInput = document.getElementById('ownerPing').value;
  let formattedOwnerPing;

  if (ownerPingInput.startsWith('<@') && ownerPingInput.endsWith('>')) {
    formattedOwnerPing = ownerPingInput;
  } else {
    formattedOwnerPing = `<@${ownerPingInput}>`;
  }

  const data = {
    name: document.getElementById('name').value,
    item: document.getElementById('item').value,
    spawncode: document.getElementById('spawncode').value,
    ownerPing: formattedOwnerPing,
    tbxId: document.getElementById('tbxId').value,
    notes: document.getElementById('notes').value,
    blacklist: document.getElementById('blacklistToggle').checked
      ? `Blacklist Group: ${document.getElementById('blacklistGroup').value}\nTBX ID: ${document.getElementById('blacklistTbx').value}`
      : "false",
    radio: document.getElementById('radioToggle').checked
      ? `TBX ID: ${document.getElementById('radioTbx').value}`
      : "false",
  };

  fetch("https://discord.com/api/webhooks/1289291868479426714/FEXjN4DY7wNY-wsXgcRSrQ9NzZtfH85xik-ijG0II2ylkFI8qlUuuFuN71WBqz96XbFG", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      embeds: [{
        title: "New Form Submission",
        color: 3447003,
        fields: [
          { name: "Name", value: data.name, inline: true },
          { name: "Item", value: data.item, inline: true },
          { name: "Spawncode", value: data.spawncode, inline: false },
          { name: "Owner Ping", value: data.ownerPing, inline: false },
          { name: "TBX ID", value: data.tbxId, inline: false },
          { name: "Notes", value: data.notes || "None", inline: false },
          { name: "Blacklist", value: data.blacklist, inline: true },
          { name: "Radio", value: data.radio, inline: true }
        ],
        footer: {
          text: "SACRP Dev Forum",
        },
        timestamp: new Date()
      }]
    }),
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Network response was not ok.");
  })
  .then(data => {
    console.log("Success:", data);
    alert("Form submitted successfully!");
  })
});

document.getElementById('blacklistToggle').addEventListener('change', function() {
  const blacklistBox = document.getElementById('blacklistBox');
  const blacklistGroup = document.getElementById('blacklistGroupBox');
  if (this.checked) {
    blacklistBox.classList.add('show-box');
    blacklistGroup.classList.add('show-box');
  } else {
    blacklistBox.classList.remove('show-box');
    blacklistGroup.classList.remove('show-box');
  }
});

document.getElementById('radioToggle').addEventListener('change', function() {
  const radioBox = document.getElementById('radioBox');
  if (this.checked) {
    radioBox.classList.add('show-box');
  } else {
    radioBox.classList.remove('show-box');
  }
});
