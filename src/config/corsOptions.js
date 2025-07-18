export const corsOptions = {
  origin: function (origin, callback) {
    return callback(null, true)
  },

  // Legacy browser compatibility (IE11, SmartTVs)
  optionsSuccessStatus: 200,

  // Allow cookies in requests
  credentials: true
}
