function customerSuccessBalancing(csArray, customerArray, csUnavailable) {
  // Filtra os CSs disponíveis, removendo aqueles que estão indisponíveis e os ordena pelo score.
  const availableCSs = csArray
    .filter((cs) => !csUnavailable.includes(cs.id))
    .sort((a, b) => a.score - b.score);

  // Ordena os clientes pelo score.
  const sortedCustomers = customerArray.sort((a, b) => a.score - b.score);

  // Inicializa variáveis para acompanhar o CS que atende mais clientes e o número máximo de clientes atendidos.
  let csIndex = 0;
  let maxClients = 0;
  let maxCSId = 0;

  // Itera sobre os clientes para atribuí-los aos CSs disponíveis.
  sortedCustomers.forEach((customer) => {
    // Enquanto houver CSs disponíveis e o CS atual não atender às necessidades do cliente, passa para o próximo CS.
    while (
      csIndex < availableCSs.length &&
      availableCSs[csIndex].score < customer.score
    ) {
      csIndex++;
    }
    // Se ainda houver CSs disponíveis, atribui o cliente ao próximo CS disponível.
    if (csIndex < availableCSs.length) {
      availableCSs[csIndex].clients = (availableCSs[csIndex].clients || 0) + 1;
      // Atualiza o CS que atende mais clientes, se necessário.
      if (availableCSs[csIndex].clients > maxClients) {
        maxClients = availableCSs[csIndex].clients;
        maxCSId = availableCSs[csIndex].id;
      } else if (availableCSs[csIndex].clients === maxClients) {
        // Em caso de empate, atribui 0 ao id do CS.
        maxCSId = 0;
      }
    }
  });

  // Retorna o ID do CS que atende mais clientes.
  return maxCSId;
}

export default customerSuccessBalancing;
