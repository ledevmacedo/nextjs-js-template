# App Router: Os Elementos Especiais que Fazem a Mágica ✨

## Aula 1: Layout.tsx - O "Template da Casa" 🏠

### O que é Layout?

Layout é como a **estrutura fixa da sua casa** - as paredes, o teto, as portas. Não importa qual cômodo (página) você está visitando, a estrutura básica sempre está lá.[1][4]

### Layout Básico - O Pai de Todos

Todo projeto **OBRIGATORIAMENTE** tem um `layout.tsx` na raiz :[4]

```javascript
// app/layout.tsx - O "esqueleto" básico
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <header>
          <h1>🧁 Confeitaria da Isadora ✨</h1>
          <nav>Menu | Sobre | Contato</nav>
        </header>
        
        {children} {/* Aqui entra cada página específica */}
        
        <footer>
          <p>© 2025 - A melhor confeitaria do Porto!</p>
        </footer>
      </body>
    </html>
  )
}
```

### Layouts Aninhados - Bonecas Russas 🪆

Você pode ter layouts dentro de layouts. É como ter uma casa com quartos temáticos :[7]

```javascript
// app/admin/layout.tsx - Layout específico para área administrativa
export default function AdminLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: '200px', background: '#f0f0f0' }}>
        <h3>🔐 Painel Admin</h3>
        <ul>
          <li>Pedidos</li>
          <li>Cardápio</li>
          <li>Clientes</li>
        </ul>
      </aside>
      
      <main style={{ flex: 1, padding: '20px' }}>
        {children} {/* Páginas administrativas aparecem aqui */}
      </main>
    </div>
  )
}
```

**Exemplo Prático:**
```
app/
├── layout.tsx           # Layout raiz (header + footer)
├── page.tsx            # Home
└── admin/
    ├── layout.tsx      # Layout do admin (sidebar)
    └── page.tsx        # Dashboard admin
```

### __CRIAR EXEMPLO VISUAL DO SANDUICHE__ ⬇️

Quando alguém acessa `/admin`, Next.js faz o "sanduíche":
1. Layout raiz (header + footer) por fora
2. Layout admin (sidebar) por dentro  
3. Conteúdo da página no meio

---

## Aula 2: Loading.tsx - A Tela de "Carregando..." 🔄

### O que é Loading?

É aquela telinha que aparece enquanto sua página está "pensando" - como quando você pede uma pizza e fica esperando.[1]

### Loading Automático

Crie um arquivo `loading.tsx` na mesma pasta da sua `page.tsx`:

```javascript
// app/cardapio/loading.tsx
export default function Loading() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>🍕 Preparando o cardápio...</h2>
      <p>Só um minutinho!</p>
      <div>🔄 Carregando...</div>
    </div>
  )
}
```

### Como Funciona na Prática

```
app/cardapio/
├── loading.tsx         # Aparece enquanto page.tsx carrega
└── page.tsx           # Página final
```
### __Usar o raciocinio logico do esqueiro e da lareira, "qual a primeira coisa que eu faço?__
Quando alguém acessa `/cardapio`:
1. `loading.tsx` aparece **instantaneamente**
2. `page.tsx` carrega em segundo plano
3. Quando terminar, `loading.tsx` some e `page.tsx` aparece

### Loading com Suspense

Você também pode usar Suspense para controlar o carregamento manualmente:

```javascript
// app/cardapio/page.tsx
import { Suspense } from 'react'

function CardapioLento() {
  // Simula uma busca lenta no banco
  return <div>Aqui está o cardápio completo!</div>
}

export default function Cardapio() {
  return (
    <div>
      <h1>🍕 Nosso Cardápio</h1>
      
      <Suspense fallback={<div>🔄 Buscando pizzas...</div>}>
        <CardapioLento />
      </Suspense>
    </div>
  )
}
```

***

## Aula 3: Rotas Dinâmicas [id] - O Curinga das URLs 🃏
#### !Colocar gif do coringa corringando
### O que são Rotas Dinâmicas?

Imagine que você tem 500 tipos de pizza. Você não vai criar 500 páginas diferentes, né? As rotas dinâmicas são como um "molde" que funciona para qualquer pizza.[11]

### Sintaxe dos Colchetes

Use `[alguma_coisa]` para criar rotas que aceitam qualquer valor:

```
app/
└── pizza/
    └── [id]/
        └── page.tsx    # Funciona para /pizza/1, /pizza/2, /pizza/margherita, etc.
```

### Acessando o Valor Dinâmico

```javascript
// app/pizza/[id]/page.tsx
export default function PizzaDetalhes({ params }) {
  const { id } = params
  
  return (
    <div>
      <h1>🍕 Pizza: {id}</h1>
      <p>Você está vendo detalhes da pizza: <strong>{id}</strong></p>
      
      {/* Se a URL for /pizza/margherita, id será "margherita" */}
    </div>
  )
}
```

### Múltiplos Parâmetros

```
app/
└── restaurante/
    └── [cidade]/
        └── [bairro]/
            └── page.tsx    # /restaurante/sao-paulo/vila-madalena
```

```javascript
// app/restaurante/[cidade]/[bairro]/page.tsx
export default function Restaurante({ params }) {
  const { cidade, bairro } = params
  
  return (
    <div>

      <h1>🏪 Restaurante</h1>
      <p>Cidade: {cidade}</p>
      <p>Bairro: {bairro}</p>

      <p>URL: /restaurante/{cidade}/{bairro}</p>

    </div>
  )
}
```

### Catch-All Routes [...slug]

Para capturar múltiplos segmentos, use `[...nome]`:

```javascript
// app/docs/[...slug]/page.tsx
export default function Documentacao({ params }) {
  const { slug } = params // slug é um ARRAY!
  
  return (
    <div>
      <h1>📖 Documentação</h1>
      <p>Caminho: {slug.join(' → ')}</p>
      
      {/* 
        /docs/receitas/pizza/massa 
        slug = ['receitas', 'pizza', 'massa']
        Resultado: receitas → pizza → massa
      */}
    </div>
  )
}
```

***

## Aula 4: Route Groups () - Pastas Invisíveis 👻

### O que são Route Groups?

São pastas **"fantasma"** que servem para organizar, mas não aparecem na URL. É como ter gavetas organizadoras que são invisíveis para os clientes.[7]

### Sintaxe dos Parênteses

Use `(nome_qualquer)` para criar pastas que **NÃO** viram rotas:

```
app/
├── (marketing)/          # Pasta fantasma - não vira rota!
│   ├── sobre/
│   │   └── page.tsx     # Vira rota /sobre (sem o marketing)
│   └── contato/
│       └── page.tsx     # Vira rota /contato
└── (loja)/              # Outra pasta fantasma
    ├── produtos/
    │   └── page.tsx     # Vira rota /produtos
    └── carrinho/
        └── page.tsx     # Vira rota /carrinho
```

### Por que Usar Route Groups?

1. **Organização**: Agrupar páginas relacionadas
2. **Layouts específicos**: Cada grupo pode ter seu próprio layout
3. **Equipe**: Separar trabalho de diferentes times

### Exemplo Prático: Site de Pizzaria

```
app/
├── layout.tsx                  # Layout geral
├── page.tsx                    # Home
├── (publico)/                  # Grupo para páginas abertas
│   ├── layout.tsx              # Layout público (sem login)
│   ├── cardapio/
│   │   └── page.tsx            # /cardapio
│   └── sobre/
│       └── page.tsx            # /sobre
└── (admin)/                    # Grupo para área administrativa
    ├── layout.tsx              # Layout admin (com sidebar)
    ├── pedidos/
    │   └── page.tsx            # /pedidos
    └── relatorios/
        └── page.tsx            # /relatorios
```

### Layouts Diferentes por Grupo

```javascript
// app/(publico)/layout.tsx - Layout simples para clientes
export default function PublicoLayout({ children }) {
  return (
    <div>
      <nav style={{ background: 'white' }}>
        <h1>🍕 Pizzaria do João</h1>
        <a href="/cardapio">Cardápio</a>
        <a href="/sobre">Sobre</a>
      </nav>
      {children}
    </div>
  )
}

// app/(admin)/layout.tsx - Layout complexo para administração
export default function AdminLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: '200px', background: '#333', color: 'white' }}>
        <h2>🔐 Admin</h2>
        <a href="/pedidos">Pedidos</a>
        <a href="/relatorios">Relatórios</a>
      </aside>
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  )
}
```

## Exercício Prático Final 🎯

Crie esta estrutura completa:

```
app/
├── layout.tsx             # Layout raiz
├── loading.tsx            # Loading global
├── page.tsx               # Home
├── (cliente)/             # Grupo cliente
│   ├── layout.tsx         # Layout cliente
│   ├── pizza/
│   │   ├── loading.tsx    # Loading das pizzas
│   │   ├── page.tsx       # Lista de pizzas
│   │   └── [id]/
│   │       └── page.tsx   # Pizza específica
│   └── pedido/
│       └── [...steps]/
│           └── page.tsx   # Passos do pedido
└── (admin)/               # Grupo admin
    ├── layout.tsx         # Layout admin
    └── dashboard/
        └── page.tsx       # Dashboard
```

**Teste acessando:**
- `/` → Home
- `/pizza` → Lista de pizzas (com loading)
- `/pizza/margherita` → Pizza específica
- `/pedido/endereco/pagamento/confirmacao` → Passos do pedido
- `/dashboard` → Área administrativa