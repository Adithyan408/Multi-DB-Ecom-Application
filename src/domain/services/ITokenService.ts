export interface ITokenService { 
    generateAccessToken(userId:string):string;
    generateRefreshToken(userId:string):string;
    hashRefreshToken(token: string): string;
}