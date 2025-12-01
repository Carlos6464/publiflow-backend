export class PapelUsuario {
    private id: number;
    private papel: string;

    constructor(id: number, papel: string) {
        this.id = id;
        this.papel = papel;
    }
    
    public getId(): number {
        return this.id;
    }

    public getPapel(): string {
        return this.papel;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setPapel(papel: string): void {
        this.papel = papel;
    }
}