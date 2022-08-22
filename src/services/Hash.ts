import bcryte from 'bcrypt';

export type Salt = string | number;
export default class Hash {
    protected plainText: string;
    protected salt: Salt;

    constructor(plainText: string) {
        const saltOrRounds = bcryte.genSaltSync(11);
        this.plainText = plainText;
        this.salt = parseInt(saltOrRounds);
    }

    hash():string {
        return bcryte.hashSync(this.plainText, this.salt);
    }

    verify(hash: string): boolean {
        return bcryte.compareSync(this.plainText, hash);
    }
}
