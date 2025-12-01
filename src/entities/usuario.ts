export class Usuario {
    private id: number;
    private nome: string;
    private sobrenome: string;
    private telefone: string;
    private email: string;
    private papelUsuarioID: number;
    private senha: string;
    private dataCadastro: Date;

    constructor(
        id: number,
        nome: string,
        sobrenome: string,
        telefone: string,
        email: string,
        papelUsuarioID: number,
        senha: string,
        dataCadastro: Date
    ) {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.telefone = telefone;
        this.email = email;
        this.papelUsuarioID = papelUsuarioID;
        this.senha = senha;
        this.dataCadastro = dataCadastro;
    }

    public getId(): number {
        return this.id;
    }

    public getNome(): string {
        return this.nome;
    }

    public getSobrenome(): string {
        return this.sobrenome;
    }

    public getTelefone(): string {
        return this.telefone;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPapelUsuarioID(): number {
        return this.papelUsuarioID;
    }

    public getSenha(): string {
        return this.senha;
    }

    public getDataCadastro(): Date {
        return this.dataCadastro;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public setSobrenome(sobrenome: string): void {
        this.sobrenome = sobrenome;
    }

    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setPapelUsuarioID(papelUsuarioID: number): void {
        this.papelUsuarioID = papelUsuarioID;
    }

    public setSenha(senha: string): void {
        this.senha = senha;
    }

    public setDataCadastro(dataCadastro: Date): void {
        this.dataCadastro = dataCadastro;
    }
}