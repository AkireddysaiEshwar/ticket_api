app.post('/api/tickets/create', async (req, res) => {
  const { numberOfTickets } = req.body;

  try {
    const tickets = generateTickets(numberOfTickets);
    const userId = req.user.userId;
    await Ticket.create({ userId, tickets });
    res.json({ message: 'Tickets created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

function generateTickets(numberOfTickets) {
  const ticketSet = [];
  const numbers = Array.from({ length: 90 }, (_, i) => i + 1);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  const columns = [];
  for (let i = 0; i < 9; i++) {
    const column = numbers.slice(i * 10, (i + 1) * 10);
    columns.push(column);
  }

  for (let i = 0; i < 6; i++) {
    const ticket = [];

    for (let j = 0; j < 9; j++) {
      const column = columns[j].slice(i * 5, (i + 1) * 5);
      ticket.push(...column);
    }

    ticketSet.push(ticket);
  }

  return ticketSet;
}
