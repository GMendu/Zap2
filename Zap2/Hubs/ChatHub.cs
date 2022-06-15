using Microsoft.AspNetCore.SignalR;

namespace Zap2.Hubs
{
    public class ChatHub : Hub
    {
        /*public async Task SendMessage(string user, string message)
         {
             await Clients.All.SendAsync("ReceiveMessage", user, message);
         }*/
        /// <summary>
        /// Envia mensagem para o servidor
        /// </summary>
        /// <param name="user">nome de usuario</param>
        /// <param name="message">mensagem enviada</param>
        /// <param name="room">sala de envio</param>
        /// <param name="opcao">0 = mensagem, 1 = entrar, 2 = sair</param>
        /// <returns></returns>
        public async Task SendMessage(string user, string message, string room, int opcao)
        {
            if (opcao == 0)
            {
                await Clients.Group(room).SendAsync("ReceiveMessage", user, message).ConfigureAwait(true);
                using (StreamWriter w = File.AppendText(@"C:\Users\Aluno\Source\Repos\GMendu\Zap2\Zap2\wwwroot\log.txt"))
                {
                    w.WriteLine($"[{DateTime.Now}]{room} - {user}: {message}");
                }
            }
            else
            if (opcao == 1)
            {
                await JoinRoom(room).ConfigureAwait(false);
                await Clients.Group(room).SendAsync("ReceiveJoin", user, " entrou na sala " + room).ConfigureAwait(true);
                //List<int> usuarios = new List<int>();
            }
            else
            if (opcao == 2)
            {
                await LeaveRoom(room).ConfigureAwait(false);
                await Clients.Group(room).SendAsync("ReceiveJoin", user, " saiu da sala").ConfigureAwait(true);
            }
        }

        public Task JoinRoom(string roomName)
        {
            return Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        }

        public Task LeaveRoom(string roomName)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);

        }
    }
}