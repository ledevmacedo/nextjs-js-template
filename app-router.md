# Curso Completo: App Router do Next.js - Do Zero ao Profissional 🚀

O App Router do Next.js é como se fosse um sistema de correios super inteligente da sua aplicação web - ele entende exatamente para onde levar cada usuário baseado no endereço (URL) que eles digitaram, e ainda decide se vai entregar a "carta" (página) pelo servidor ou pelo navegador.[1][2]

## Aula 1: Fundamentos - O que é o App Router?

### O que você vai aprender

Imagine que você tem uma casa gigante com várias salas. O App Router é como um mordomo super eficiente que:
- Sabe exatamente qual sala (página) mostrar para cada visitante
- Organiza tudo baseado na estrutura de pastas do seu projeto  
- Decide se vai preparar a sala antes do visitante chegar (servidor) ou na hora (cliente)

### Diferenças do Pages Router vs App Router

O **Pages Router** (antigo) era como ter um índice de livro simples - cada arquivo virava automaticamente uma página :[2][3]

```javascript
// pages/sobre.js - Criava automaticamente a rota /sobre
export default function Sobre() {
  return <h1>Página Sobre</h1>
}
```

O **App Router** (novo) é como ter um sistema de organização mais sofisticado, onde você tem controle total sobre o que vira rota e o que não vira :[4][1]

```javascript
// app/sobre/page.js - SÓ vira rota porque tem o arquivo page.js
export default function Sobre() {
  return <h1>Página Sobre</h1>
}
```

### Por que o App Router é melhor?

1. **Server Components por padrão** - Mais rápido e eficiente[1]
2. **Organização melhor** - Você pode colocar arquivos junto das rotas sem criar rotas acidentalmente[4]
3. **Layouts aninhados** - Como bonecas russas, mas para páginas web[1]
4. **Performance superior** - Carrega só o que precisa, quando precisa[1]

### Exercício Prático 1

**Objetivo**: Criar seu primeiro projeto com App Router

1. Abra o terminal e digite:
```bash
npx create-next-app@latest meu-primeiro-app-router
```

2. Quando perguntado sobre usar App Router, responda **YES**[5]

3. Entre na pasta e rode o projeto:
```bash
cd meu-primeiro-app-router
npm run dev
```

4. Abra http://localhost:3000 e veja a mágica acontecer!

**Checkpoint**: Você deve ver a página inicial do Next.js rodando. Se não conseguir, revise os passos acima.

***

## Aula 2: Estrutura de Pastas - A Organização que Faz Diferença

### Como Funciona a Estrutura

Pense no App Router como uma biblioteca onde cada estante (pasta) tem uma função específica :[6][4]

```
meu-app/
├── app/                    # A "biblioteca principal" - onde vivem as rotas
│   ├── page.js            # Página inicial (/) 
│   ├── about/             # Pasta = rota potencial
│   │   └── page.js        # Transforma /about em rota real
│   ├── produtos/          
│   │   ├── page.js        # Rota /produtos
│   │   └── [id]/          # Rota dinâmica
│   │       └── page.js    # Rota /produtos/123
│   └── layout.js          # Layout principal - como o "template" da casa
├── public/                # Imagens, ícones - a "decoração" da casa
└── package.json           # Lista de "ferramentas" do projeto
```

### Regra de Ouro

**IMPORTANTÍSSIMO**: Uma pasta só vira rota se tiver um arquivo `page.js` dentro! É como se a pasta fosse um quarto, mas só vira quarto de verdade quando você coloca uma cama (page.js) lá dentro.[6][4]

### Arquivos Especiais

Cada arquivo especial tem uma função única :[6][1]

- `page.js` - O conteúdo da página (obrigatório para criar rota)
- `layout.js` - O "template" que envolve suas páginas
- `loading.js` - Tela de carregamento personalizada  
- `error.js` - Página de erro personalizada
- `not-found.js` - Página 404 personalizada

### Pastas Privadas

Use `_` na frente do nome para criar pastas "invisíveis" para o roteador :[4][6]

```
app/
├── _components/           # Não vira rota - é privada!
│   └── Button.js         
├── _utils/               # Não vira rota - é privada!
│   └── helpers.js        
└── produtos/             # Esta SIM pode virar rota
    └── page.js           # E vira porque tem page.js
```

### Exercício Prático 2

**Objetivo**: Criar sua primeira estrutura de rotas

1. No seu projeto, dentro da pasta `app`, crie:
   - Uma pasta `sobre`
   - Dentro dela, um arquivo `page.js`

2. No arquivo `page.js`, coloque:
```javascript
export default function Sobre() {
  return (
    <div>
      <h1>Sobre Nós</h1>
      <p>Esta é nossa página sobre!</p>
    </div>
  )
}
```

3. Acesse http://localhost:3000/sobre

4. Agora crie uma pasta `_components` (com underscore) dentro de `app`

5. Tente acessar http://localhost:3000/_components - não vai funcionar, e é assim mesmo!

**Checkpoint**: Você deve conseguir acessar /sobre mas não /_components.

***

## Aula 3: Pages e Layouts - Os Tijolos da sua Aplicação

### O que são Layouts?

Layout é como a "estrutura básica da casa" - header, footer, menu lateral. É o que se repete em várias páginas.[6][1]

Imagine que você tem um site de e-commerce. O header com logo e carrinho aparece em todas as páginas, certo? Isso é um layout!

### Layout Raiz (Root Layout)

Todo projeto Next.js com App Router **OBRIGATORIAMENTE** tem um `app/layout.js` :[1]

```javascript
// app/layout.js - O "esqueleto" de todas as páginas
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <header>
          <h1>Minha Loja</h1>
          <nav>Menu aqui</nav>
        </header>
        
        <main>
          {children} {/* Aqui vai aparecer o conteúdo de cada página */}
        </main>
        
        <footer>
          <p>© 2025 Minha Loja</p>
        </footer>
      </body>
    </html>
  )
}
```

### Layouts Aninhados

Você pode ter layouts dentro de layouts, como bonecas russas :[1]

```javascript
// app/dashboard/layout.js - Layout específico para área administrativa
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <aside>
        <h2>Menu Admin</h2>
        <ul>
          <li>Usuários</li>
          <li>Produtos</li>
          <li>Vendas</li>
        </ul>
      </aside>
      
      <div className="content">
        {children} {/* Páginas do dashboard aparecem aqui */}
      </div>
    </div>
  )
}
```

### Como Funciona na Prática

Quando alguém acessa `/dashboard/usuarios`:

1. Next.js pega o `app/layout.js` (layout raiz)
2. Dentro do `{children}` do layout raiz, coloca o `app/dashboard/layout.js`
3. Dentro do `{children}` do dashboard layout, coloca o conteúdo de `app/dashboard/usuarios/page.js`

É como vestir várias camisas - uma por cima da outra!

### Exercício Prático 3

**Objetivo**: Criar um layout personalizado

1. Edite seu `app/layout.js`:
```javascript
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Meu Site Incrível</title>
      </head>
      <body style={{ fontFamily: 'Arial, sans-serif' }}>
        <header style={{ background: '#333', color: 'white', padding: '1rem' }}>
          <h1>🚀 Meu Site</h1>
        </header>
        
        <main style={{ padding: '2rem' }}>
          {children}
        </main>
        
        <footer style={{ background: '#f0f0f0', padding: '1rem', textAlign: 'center' }}>
          <p>© 2025 - Feito com Next.js!</p>
        </footer>
      </body>
    </html>
  )
}
```

2. Crie uma pasta `app/blog` com um `layout.js` dentro:
```javascript
export default function BlogLayout({ children }) {
  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <aside style={{ width: '200px', background: '#f9f9f9', padding: '1rem' }}>
        <h3>📝 Blog Menu</h3>
        <ul>
          <li>Artigos Recentes</li>
          <li>Categorias</li>
          <li>Tags</li>
        </ul>
      </aside>
      
      <div style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  )
}
```

3. Crie `app/blog/page.js`:
```javascript
export default function Blog() {
  return (
    <div>
      <h1>🎯 Bem-vindo ao Blog!</h1>
      <p>Aqui você encontra os melhores artigos sobre desenvolvimento web.</p>
    </div>
  )
}
```

4. Acesse http://localhost:3000/blog

**Checkpoint**: Você deve ver o header/footer em todas as páginas, e o menu lateral só na página do blog.

***

## Aula 4: Navegação e Links - Como Ligar as Páginas

### O Componente Link

No Next.js, **NUNCA** use `<a>` tags para navegação interna. Use sempre o componente `Link` - é como usar um elevador em vez de escadas :[1]

```javascript
import Link from 'next/link'

export default function Menu() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/sobre">Sobre</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/contato">Contato</Link>
    </nav>
  )
}
```

### Por que Link é Melhor?

1. **Navegação instantânea** - Não recarrega a página toda
2. **Prefetch automático** - Carrega a próxima página antes mesmo do usuário clicar
3. **Otimizações automáticas** - Next.js faz várias otimizações por baixo dos panos

### Navegação Programática

Às vezes você precisa navegar depois de uma ação (como salvar um formulário). Use o `useRouter` :[1]

```javascript
'use client' // Lembre-se: useRouter só funciona em Client Components!

import { useRouter } from 'next/navigation'

export default function FormularioContato() {
  const router = useRouter()
  
  const handleSubmit = (event) => {
    event.preventDefault()
    
    // Simula salvamento
    console.log('Formulário salvo!')
    
    // Navega para página de sucesso
    router.push('/sucesso')
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Seu nome" />
      <button type="submit">Enviar</button>
    </form>
  )
}
```

### Link com Estilo

Você pode estilizar Links normalmente :[1]

```javascript
import Link from 'next/link'

export default function MenuEstilizado() {
  return (
    <nav style={{ display: 'flex', gap: '1rem' }}>
      <Link 
        href="/" 
        style={{ 
          color: 'blue', 
          textDecoration: 'none',
          padding: '0.5rem',
          borderRadius: '4px',
          background: '#f0f0f0'
        }}
      >
        🏠 Home
      </Link>
      
      <Link 
        href="/blog"
        style={{ 
          color: 'green', 
          textDecoration: 'none',
          padding: '0.5rem',
          borderRadius: '4px',
          background: '#f0f0f0'
        }}
      >
        📝 Blog
      </Link>
    </nav>
  )
}
```

### Exercício Prático 4

**Objetivo**: Criar um sistema de navegação completo

1. Crie um componente de navegação em `app/_components/Navbar.js`:
```javascript
import Link from 'next/link'

export default function Navbar() {
  const menuItems = [
    { href: '/', label: '🏠 Home' },
    { href: '/sobre', label: '👥 Sobre' },
    { href: '/blog', label: '📝 Blog' },
    { href: '/contato', label: '📞 Contato' }
  ]
  
  return (
    <nav style={{ 
      display: 'flex', 
      gap: '1rem',
      padding: '1rem',
      background: '#333'
    }}>
      {menuItems.map((item) => (
        <Link 
          key={item.href}
          href={item.href}
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            background: '#555'
          }}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
```

2. Importe e use no seu `app/layout.js`:
```javascript
import Navbar from './_components/Navbar'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        <main style={{ padding: '2rem' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
```

3. Crie as páginas que faltam (`app/contato/page.js`)

4. Teste a navegação - note como é instantânea!

**Checkpoint**: Você deve conseguir navegar entre todas as páginas sem recarregamento.

***

## Aula 5: Rotas Dinâmicas - O Poder da Flexibilidade

### O que são Rotas Dinâmicas?

Imagine um blog com 1000 artigos. Você não vai criar 1000 arquivos diferentes, né? As rotas dinâmicas são como um "molde" que serve para várias páginas similares.[3]

### Sintaxe de Colchetes

Use `[nome]` para criar rotas dinâmicas :[3]

```
app/
├── blog/
│   ├── page.js                    # /blog
│   └── [slug]/                    # /blog/qualquer-coisa
│       └── page.js                # /blog/meu-primeiro-post
```

### Acessando Parâmetros

Use o objeto `params` para pegar os valores da URL :[3]

```javascript
// app/blog/[slug]/page.js
export default function ArtigoBlog({ params }) {
  const { slug } = params
  
  return (
    <div>
      <h1>📄 Artigo: {slug}</h1>
      <p>Você está lendo o artigo com slug: <strong>{slug}</strong></p>
      
      {/* Se a URL for /blog/nextjs-tutorial, slug será "nextjs-tutorial" */}
    </div>
  )
}
```

### Rotas com Múltiplos Parâmetros

Você pode ter vários parâmetros dinâmicos :[1]

```
app/
├── loja/
│   └── [categoria]/               # /loja/eletronicos
│       └── [produto]/             # /loja/eletronicos/smartphone
│           └── page.js
```

```javascript
// app/loja/[categoria]/[produto]/page.js
export default function PaginaProduto({ params }) {
  const { categoria, produto } = params
  
  return (
    <div>
      <h1>🛍️ {produto}</h1>
      <p>Categoria: {categoria}</p>
      <p>URL completa: /loja/{categoria}/{produto}</p>
    </div>
  )
}
```

### Catch-All Routes (Pega Tudo)

Use `[...nome]` para capturar múltiplos segmentos :[1]

```javascript
// app/docs/[...slug]/page.js
export default function Documentacao({ params }) {
  const { slug } = params // slug é um array!
  
  return (
    <div>
      <h1>📚 Documentação</h1>
      <p>Caminho: {slug.join(' > ')}</p>
      
      {/* 
        /docs/guia/instalacao/windows 
        slug = ['guia', 'instalacao', 'windows']
        Resultado: guia > instalacao > windows
      */}
    </div>
  )
}
```

### Exercício Prático 5

**Objetivo**: Criar um sistema de blog com rotas dinâmicas

1. Crie a estrutura:
```
app/
├── blog/
│   ├── page.js                    # Lista de posts
│   └── [slug]/
│       └── page.js                # Post individual
```

2. Crie `app/blog/page.js`:
```javascript
import Link from 'next/link'

export default function Blog() {
  const posts = [
    { slug: 'primeiro-post', titulo: 'Meu Primeiro Post' },
    { slug: 'aprendendo-nextjs', titulo: 'Aprendendo Next.js' },
    { slug: 'app-router-tutorial', titulo: 'Tutorial do App Router' }
  ]
  
  return (
    <div>
      <h1>📝 Blog</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {posts.map((post) => (
          <Link 
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{
              padding: '1rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <h2>{post.titulo}</h2>
            <p>Clique para ler mais...</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

3. Crie `app/blog/[slug]/page.js`:
```javascript
import Link from 'next/link'

export default function PostBlog({ params }) {
  const { slug } = params
  
  // Simula busca de dados baseado no slug
  const posts = {
    'primeiro-post': {
      titulo: 'Meu Primeiro Post',
      conteudo: 'Este é o conteúdo do meu primeiro post...'
    },
    'aprendendo-nextjs': {
      titulo: 'Aprendendo Next.js',
      conteudo: 'Next.js é incrível para criar aplicações React...'
    },
    'app-router-tutorial': {
      titulo: 'Tutorial do App Router',
      conteudo: 'O App Router trouxe muitas melhorias...'
    }
  }
  
  const post = posts[slug]
  
  if (!post) {
    return (
      <div>
        <h1>❌ Post não encontrado</h1>
        <Link href="/blog">← Voltar para o blog</Link>
      </div>
    )
  }
  
  return (
    <article>
      <Link href="/blog" style={{ color: 'blue' }}>← Voltar para o blog</Link>
      
      <h1>{post.titulo}</h1>
      <p><strong>Slug:</strong> {slug}</p>
      <div style={{ marginTop: '2rem' }}>
        <p>{post.conteudo}</p>
      </div>
    </article>
  )
}
```

4. Teste navegando para http://localhost:3000/blog e clicando nos posts

**Checkpoint**: Você deve conseguir ver a lista de posts e acessar cada post individual através das rotas dinâmicas.

***

## Aula 6: Server Components vs Client Components - O Coração do App Router

### A Grande Diferença

Esta é **A** diferença mais importante do App Router. É como ter dois tipos de funcionários :[1]

- **Server Components** (padrão): Trabalham na "cozinha" (servidor) - mais rápidos, seguros
- **Client Components**: Trabalham na "mesa" (navegador) - interativos, com estado

### Server Components (Padrão)

**TODOS** os componentes no App Router são Server Components por padrão :[1]

```javascript
// app/produtos/page.js - Server Component (padrão)
export default function Produtos() {
  // Este código roda NO SERVIDOR
  const produtos = [
    { id: 1, nome: 'Notebook', preco: 2500 },
    { id: 2, nome: 'Mouse', preco: 50 }
  ]
  
  return (
    <div>
      <h1>🛍️ Produtos</h1>
      {produtos.map(produto => (
        <div key={produto.id}>
          <h2>{produto.nome}</h2>
          <p>R$ {produto.preco}</p>
        </div>
      ))}
    </div>
  )
}
```

### Vantagens dos Server Components

1. **Performance** - HTML já vem pronto do servidor
2. **SEO** - Google consegue ler tudo
3. **Segurança** - Chaves secretas ficam no servidor
4. **Bundle menor** - Menos JavaScript para baixar

### Client Components

Quando você precisa de interatividade, use `'use client'` :[1]

```javascript
'use client' // Esta linha OBRIGATÓRIA transforma em Client Component

import { useState } from 'react'

export default function Contador() {
  const [count, setCount] = useState(0) // useState só funciona no cliente!
  
  return (
    <div>
      <h2>🔢 Contador: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
    </div>
  )
}
```

### Quando Usar Cada Um?

**Use Server Components para:**
- Buscar dados de APIs/banco
- Renderizar listas
- Conteúdo estático
- SEO importante

**Use Client Components para:**
- onClick, onChange, onSubmit
- useState, useEffect
- Bibliotecas que usam browser APIs
- Interatividade em geral

### Exemplo Prático: Misturando os Dois

```javascript
// app/dashboard/page.js - Server Component
import ContadorInterativo from '../_components/ContadorInterativo'

export default function Dashboard() {
  // Este código roda no servidor
  const dadosDoServidor = {
    usuario: 'João',
    ultimoLogin: '2025-01-15'
  }
  
  return (
    <div>
      <h1>📊 Dashboard</h1>
      <p>Bem-vindo, {dadosDoServidor.usuario}!</p>
      <p>Último login: {dadosDoServidor.ultimoLogin}</p>
      
      {/* Este componente roda no cliente */}
      <ContadorInterativo />
    </div>
  )
}
```

### Exercício Prático 6

**Objetivo**: Criar uma página que mistura Server e Client Components

1. Crie `app/_components/FormularioComentario.js`:
```javascript
'use client'

import { useState } from 'react'

export default function FormularioComentario() {
  const [comentario, setComentario] = useState('')
  const [comentarios, setComentarios] = useState(['Ótimo artigo!', 'Muito útil!'])
  
  const adicionarComentario = (e) => {
    e.preventDefault()
    if (comentario.trim()) {
      setComentarios([...comentarios, comentario])
      setComentario('')
    }
  }
  
  return (
    <div style={{ marginTop: '2rem', padding: '1rem', background: '#f9f9f9' }}>
      <h3>💬 Comentários</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        {comentarios.map((comentario, index) => (
          <div key={index} style={{ 
            padding: '0.5rem', 
            margin: '0.5rem 0', 
            background: 'white',
            borderRadius: '4px'
          }}>
            {comentario}
          </div>
        ))}
      </div>
      
      <form onSubmit={adicionarComentario}>
        <input
          type="text"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Deixe seu comentário..."
          style={{ 
            width: '100%', 
            padding: '0.5rem',
            marginBottom: '0.5rem'
          }}
        />
        <button type="submit" style={{ 
          padding: '0.5rem 1rem',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}>
          Comentar
        </button>
      </form>
    </div>
  )
}
```

2. Modifique `app/blog/[slug]/page.js` para incluir o formulário:
```javascript
import Link from 'next/link'
import FormularioComentario from '../../_components/FormularioComentario'

export default function PostBlog({ params }) {
  const { slug } = params
  
  // Dados do servidor (Server Component)
  const posts = {
    'primeiro-post': {
      titulo: 'Meu Primeiro Post',
      conteudo: 'Este é o conteúdo do meu primeiro post...',
      autor: 'João Silva',
      data: '15/01/2025'
    }
  }
  
  const post = posts[slug] || {
    titulo: 'Post não encontrado',
    conteudo: 'Este post não existe.',
    autor: 'Sistema',
    data: 'N/A'
  }
  
  return (
    <article>
      <Link href="/blog">← Voltar para o blog</Link>
      
      <h1>{post.titulo}</h1>
      <p><small>Por {post.autor} em {post.data}</small></p>
      
      <div style={{ marginTop: '2rem' }}>
        <p>{post.conteudo}</p>
      </div>
      
      {/* Client Component para interatividade */}
      <FormularioComentario />
    </article>
  )
}
```

**Checkpoint**: Você deve ver os dados do post (renderizados no servidor) e conseguir adicionar comentários (interatividade no cliente).

***

## Projeto Final: E-commerce Completo 🛒

### Objetivo

Vamos criar um e-commerce completo que usa TODOS os conceitos aprendidos:
- Rotas dinâmicas para produtos
- Server Components para listagens
- Client Components para carrinho
- Layouts aninhados para diferentes seções

### Estrutura do Projeto

```
app/
├── layout.js                     # Layout principal
├── page.js                       # Home
├── loja/
│   ├── layout.js                 # Layout da loja
│   ├── page.js                   # Lista de produtos
│   ├── [categoria]/
│   │   ├── page.js               # Produtos por categoria
│   │   └── [produto]/
│   │       └── page.js           # Produto individual
├── carrinho/
│   └── page.js                   # Página do carrinho
└── _components/
    ├── Navbar.js
    ├── CarrinhoWidget.js
    └── ProdutoCard.js
```

### Implementação Passo a Passo

**1. Dados Mock (simulados)**

Crie `app/_data/produtos.js`:
```javascript
export const produtos = [
  {
    id: 1,
    nome: 'Smartphone Pro',
    categoria: 'eletronicos',
    preco: 899,
    slug: 'smartphone-pro',
    imagem: '📱',
    descricao: 'O mais avançado smartphone do mercado'
  },
  {
    id: 2,
    nome: 'Notebook Gamer',
    categoria: 'eletronicos', 
    preco: 2499,
    slug: 'notebook-gamer',
    imagem: '💻',
    descricao: 'Para jogos e trabalho pesado'
  },
  {
    id: 3,
    nome: 'Camiseta Cool',
    categoria: 'roupas',
    preco: 49,
    slug: 'camiseta-cool',
    imagem: '👕',
    descricao: 'Camiseta 100% algodão'
  },
  {
    id: 4,
    nome: 'Tênis Sport',
    categoria: 'roupas',
    preco: 199,
    slug: 'tenis-sport',
    imagem: '👟',
    descricao: 'Ideal para corridas e caminhadas'
  }
]

export const categorias = [
  { slug: 'eletronicos', nome: 'Eletrônicos', icone: '🔌' },
  { slug: 'roupas', nome: 'Roupas', icone: '👕' }
]
```

**2. Context para Carrinho**

Crie `app/_context/CarrinhoContext.js`:
```javascript
'use client'

import { createContext, useContext, useState } from 'react'

const CarrinhoContext = createContext()

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([])
  
  const adicionarItem = (produto) => {
    setItens(prev => {
      const itemExistente = prev.find(item => item.id === produto.id)
      
      if (itemExistente) {
        return prev.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      }
      
      return [...prev, { ...produto, quantidade: 1 }]
    })
  }
  
  const removerItem = (produtoId) => {
    setItens(prev => prev.filter(item => item.id !== produtoId))
  }
  
  const totalItens = itens.reduce((total, item) => total + item.quantidade, 0)
  const totalPreco = itens.reduce((total, item) => total + (item.preco * item.quantidade), 0)
  
  return (
    <CarrinhoContext.Provider value={{
      itens,
      adicionarItem,
      removerItem,
      totalItens,
      totalPreco
    }}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext)
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de CarrinhoProvider')
  }
  return context
}
```

**3. Layout Principal com Carrinho**

Atualize `app/layout.js`:
```javascript
import { CarrinhoProvider } from './_context/CarrinhoContext'
import Navbar from './_components/Navbar'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <CarrinhoProvider>
          <Navbar />
          <main style={{ padding: '2rem' }}>
            {children}
          </main>
        </CarrinhoProvider>
      </body>
    </html>
  )
}
```

**4. Navbar com Carrinho**

Crie `app/_components/Navbar.js`:
```javascript
'use client'

import Link from 'next/link'
import { useCarrinho } from '../_context/CarrinhoContext'

export default function Navbar() {
  const { totalItens } = useCarrinho()
  
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      background: '#333',
      color: 'white'
    }}>
      <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
        <h1>🛍️ Minha Loja</h1>
      </Link>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link href="/loja" style={{ color: 'white' }}>
          Produtos
        </Link>
        
        <Link href="/carrinho" style={{ 
          color: 'white',
          position: 'relative',
          textDecoration: 'none'
        }}>
          🛒 Carrinho
          {totalItens > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: 'red',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px'
            }}>
              {totalItens}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}
```

**5. Home Page**

Atualize `app/page.js`:
```javascript
import Link from 'next/link'
import { categorias } from './_data/produtos'

export default function Home() {
  return (
    <div>
      <h1>🏠 Bem-vindo à Nossa Loja!</h1>
      <p>Encontre os melhores produtos com os melhores preços.</p>
      
      <h2>🏷️ Categorias</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginTop: '1rem'
      }}>
        {categorias.map(categoria => (
          <Link
            key={categoria.slug}
            href={`/loja/${categoria.slug}`}
            style={{
              padding: '2rem',
              background: '#f8f9fa',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'inherit',
              textAlign: 'center',
              border: '2px solid #dee2e6'
            }}
          >
            <div style={{ fontSize: '3rem' }}>{categoria.icone}</div>
            <h3>{categoria.nome}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

**Checkpoint Final**: Teste todo o fluxo - navegue pelas categorias, adicione produtos ao carrinho, veja o contador atualizar.

### Exercício de Conclusão

Complete o projeto adicionando:

1. Página de produto individual (`app/loja/[categoria]/[produto]/page.js`)
2. Página do carrinho (`app/carrinho/page.js`)
3. Componente ProdutoCard reutilizável

