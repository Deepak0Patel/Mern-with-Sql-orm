const express = require("express");

const { Contact } = require("./models/contact");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;

// for post the contact

app.post("/contacts", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/contacts", async (req, res) => {
  try {
    const contact = await Contact.findAll();
    res.status(201).json(contact);
  } catch (error) {}
});

app.get("/contacts/:id", async () => {
  try {
    const contact = await Contact.findByPk(req.params.id);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({
        error: "Contact not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.put("/contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);

    if (contact) {
      await contact.update(req.body);
      res.status(200).json(contact);
    } else {
      res.status(404).json({ error: "contact not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);

    if (contact) {
      await contact.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({
        error: "contact not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// dummy for test

app.listen(`${PORT}`, () => {
  console.log(`server is running on PORT =${PORT}`);
});
