export class Postagem {
    private id: number;
    private dataPublicacao: Date;
    private imagem: string;
    private titulo: string;
    private descricao: string;
    private visibilidade: boolean;
    private autorID: number;

    constructor(
        id: number,
        dataPublicacao: Date,
        imagem: string,
        titulo: string,
        descricao: string,
        visibilidade: boolean,
        autorID: number
    ) {
        this.id = id;
        this.dataPublicacao = dataPublicacao;
        this.imagem = imagem;
        this.titulo = titulo;
        this.descricao = descricao;
        this.visibilidade = visibilidade;
        this.autorID = autorID;
    }

    public getId(): number {
        return this.id;
    }

    public getDataPublicacao(): Date {
        return this.dataPublicacao;
    }

    public getImagem(): string {
        return this.imagem;
    }

    public getTitulo(): string {
        return this.titulo;
    }

    public getDescricao(): string {
        return this.descricao;
    }

    public getVisibilidade(): boolean {
        return this.visibilidade;
    }

    public getAutorID(): number {
        return this.autorID;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setDataPublicacao(dataPublicacao: Date): void {
        this.dataPublicacao = dataPublicacao;
    }

    public setImagem(imagem: string): void {
        this.imagem = imagem;
    }

    public setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

    public setDescricao(descricao: string): void {
        this.descricao = descricao;
    }

    public setVisibilidade(visibilidade: boolean): void {
        this.visibilidade = visibilidade;
    }

    public setAutorID(autorID: number): void {
        this.autorID = autorID;
    }
}
