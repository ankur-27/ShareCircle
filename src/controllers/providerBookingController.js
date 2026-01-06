
/* =========================
   GET PROVIDER BOOKINGS
========================= */
export const getProviderBookings = async (req, res) => {
  try {
    const provider = await User.findById(req.user.id);

    if (!provider || provider.role !== "provider") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({
      bookings: provider.bookings || []
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   UPDATE BOOKING STATUS
========================= */
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const provider = await User.findById(req.user.id);

    if (!provider || provider.role !== "provider") {
      return res.status(403).json({ message: "Access denied" });
    }

    const booking = provider.bookings.id(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await provider.save();

    res.json({
      message: "Booking status updated",
      booking
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};