const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const data = require("../../members");
//get
router.get("/", (req, res) => {
  res.json(data);
});

router.get("/:id", (req, res) => {
  const found = data.some((member) => member.id === parseInt(req.params.id));

  found
    ? res.json(data.filter((member) => member.id === parseInt(req.params.id)))
    : res.status(400).json({ msg: "No member of " + req.params.id + "found" });
});
//post
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
  };
  if (!newMember.name) {
    res.status(400).json({ msg: "Include name" });
  } else {
    data.push(newMember);
    // res.json(data);
    res.redirect("/");
  }
});

//put
router.put("/:id", (req, res) => {
  const found = data.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;
    data.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;
        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: "No member of " + req.params.id + "found" });
  }
});

//delete
router.delete("/:id", (req, res) => {
  const found = data.some((member) => member.id === parseInt(req.params.id));

  found
    ? res.json({
        msg: "Member Deleted",
        Members: data.filter((member) => member.id !== parseInt(req.params.id)),
      })
    : res.status(400).json({ msg: "No member of " + req.params.id + "found" });
});

module.exports = router;
