type Log = {
   code: string
   options: {
      username: string
   }
}

function logs_message({ code, options }: Log): string {
   const { username } = options
   const dec_username = `★ ${username} ★`

   switch (code) {
      case '001':
         return `User ${dec_username} was created successfully`
      case '101':
         return `An error occurred when trying to create the user ${dec_username}`
      case '002':
         return `User ${dec_username} was deleted successfully`
      case '102':
         return `An error occurred when trying to delete the user ${dec_username}`
      case '003':
         return `User ${dec_username} was updated successfully`
      case '103':
         return `An error occurred when trying to change data for ${dec_username}`
      case '004':
         return `You have successfully changed the password for user ${dec_username}`
      case '104':
         return `An error occurred when trying to change ${dec_username} password`
      case '111':
         return `A user with the same name already exists`
      default:
         ''
   }
}

export default function user_log(setLog: any, code: string, username: string): void {
   setLog({ message: logs_message({ code, options: { username } }), code })
   setTimeout(() => setLog({ message: '', code: '' }), 0)
}
