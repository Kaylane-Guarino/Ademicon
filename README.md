# Ademicon Project

Este é o arquivo README.md do projeto Ademicon, um projeto feito para o teste da empresa Ademicon.

Figma: https://www.figma.com/file/KmYSPScdxbieYIIfGjfAvr/Untitled?type=design&node-id=0-1&mode=design&t=qMGGvry5vfrYsFBW-0

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes pré-requisitos instalados em sua máquina:

- [Docker](https://www.docker.com/)

## Configuração

Deixei o arquivo .env no repositório de propósito, sei que em um projeto real não deve deixar. No .env já está toda a configuração que precisa.

## Executando o Projeto com Docker

Certifique-se de ter o Docker instalado em sua máquina.

1. Entre na raiz do projeto `cd Ademicon`
2. Execute o seguinte comando para criar e executar os containers: `docker-compose up -d`

Isso criará e executará os containers para o backend, frontend e MongoDB.

Acesse o frontend em `http://localhost:3000` e o backend em `http://localhost:8089`.

## Uso

1. Ao acessar no seu navegador `http://localhost:3000`, você verá uma página de login da Ademicon. Acesse "Resgistrar-se" e crie seu próprio login.
2. Ao clicar em `Salvar`, voltará para a página de login e com os dados que você criou, faça o login.
3. Ao entrar no sistema temos como layout: um menu, um header e uma content.
4. De cara temos a tela Home onde descreve a Ademicon
5. No menu você pode ver a próxima tela "Lista de clientes", onde temos um CRUD de clientes.
6. No header da tela de Lista de clientes tem um botão `Adicionar Cliente`, que abre uma modal que pode adicionar clientes é só adicionar todos os dados.
7. Na listagem temos os dados do cliente que pode ser editado ou deletado ao clicar nos icones a direita da lista.
8. Por fim temos o botão de logout no final do menu.

### Lembrando que o layout de todo o sistema é responsivo, caso queira testar é só segui os seguintes passos:

1. No navegador, na pagina `http://localhost:3000` pressione a tecla `f12`, isso abrirá uma jabela.
2. No topo dessa janela, você verá 2 icones e ao lado algumas opções como "Network" e "Console". Clique no segundo icone ao lado de uma seta com um quadrado listrado, um icone que representa um laptop e um celular.
3. Isso abrirá um ajuste de tela, do lado direito tem uma barra cinza que se você apertar, segurar e arrastar para os lados, ajustará o tamanho da tela. Você pode também adicionar os tamanhos de tela na mão nas opções que tem ao lado de "Dimensions: Responsive".
