const Ticket = require("../models/ticket");
const generateTicket = require("../utils/generateTickets");

module.exports = {
  createTicket: async (req, res, next) => {
    try {
      const { userId} = req.body;
      const tickets = generateTicket();
      if (!Array.isArray(tickets)) {
        return res.status(500).json({ error: "Error generating tickets" });
      }
      const result = await Ticket.insertMany(
        tickets.map((ticket) => ({
          userId: userId,
          numbers: ticket,
        }))
      );
      res.json(`Inserted ${result.length} tickets`);
    } catch (error) {
      next(error);
    }
  },

  getTicket: async (req, res, next) => {
    try {
      const perPage = 10;
      const page = req.query.page || 1;
      const {id }= req.body;
      const tickets = await Ticket.find({ user_id: id })
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec();
    const count = await Ticket.countDocuments({ user_id: id });
    res.status(200).json({
      tickets: tickets,
      current: page,
      pages: Math.ceil(count / perPage),
      total: count
    });
    } catch (error) {
      next(error);
    }
  },
};
