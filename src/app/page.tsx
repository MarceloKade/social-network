export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center bg-slate-600 w-screen h-screen text-slate-50">
      <h1 className="font-title text-xl">Social Network</h1>
      <p className="font-nameUser text-lg">Nome de usuários</p>
      <p className="font-postTitle text-2xl">Títulos de post</p>
      <p className="font-content text-sm">Conteúdo de post e comentários</p>
      <button className="font-button text-base">Botões</button>
    </div>
  );
}