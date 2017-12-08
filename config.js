module.exports = {
  log: {
    appenders:
      {
        app: {
          type: 'dateFile',
          filename: 'log/access.log',
          daysToKeep: 30
        }
      },
    logger: 'access',
    categories: {
      default:
        {
          appenders: ['app'], level: 'info'
        }
    }
  }

}