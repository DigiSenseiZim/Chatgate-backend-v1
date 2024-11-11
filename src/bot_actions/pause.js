const axios = require('axios')

  /**
   * Pauses the bot for a given conversation thread.
   * Developed By: Zibusiso Ndlovu, David Smart, Kundai Jonga and Anopaishe Meki
   * @title Pause Conversation
   * @category hitl
   * @description Temporarily pauses the bot interaction for a specific conversation thread
   * @author Botpress, Inc.
   */
  const pauseBot = async (event, pauseDuration) => {
    const knex = require('knex')({
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'postgres',
        database: 'botpress'
      }
    })

    const getIdByThreadId = async threadId => {
      try {
        const result = await knex('hitl_sessions')
          .select('id')
          .where({ thread_id: threadId })
          .first() // Use .first() to get a single result

        return result ? result.id : null // Returns the id if found, otherwise null
      } catch (error) {
        console.error('Error retrieving id:', error)
        throw error
      }
    }

    const sessionId = await getIdByThreadId(event.threadId)
    console.log('your session id', sessionId)

    // Check if the conversation was initiated via an incompatible API (e.g., Converse API)
    if (event.channel === 'api') {
      bp.logger
        .forBot(event.botId)
        .warn(
          "HITLNext: The event was created by the Converse API, it will be discarded (no pause will be created) since it's incompatible with the module."
        )
      return
    }

    // Retrieve the configuration for Axios to make an authenticated request
    const axiosConfig = await bp.http.getAxiosConfigForBot(event.botId, { localUrl: true })

    // Use the session ID from the event object and specify 'pause' as the action

    const action = 'pause'
    const url = `/mod/hitl/sessions/${sessionId}/${action}`

    console.log('your session id', sessionId)
    // Send a POST request to the pause endpoint
    await axios.post(url, {}, axiosConfig)
  }

  // Call the pauseBot function with the event and pause duration
  return pauseBot(event, args.pauseDuration)