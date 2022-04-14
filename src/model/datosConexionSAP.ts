export class DatosConexionSAP {
    server: string = "";
    licenseServer: string = "";
    companyDB: string = "";
    userName: string = "";
    password: string = "";
    dbUserName: string = "";
    dbPassword: string = "";
    dbServerType: string = "";
    language: string = "";
    useTrusted: string = "";

    convertToString(): string {
        return "server=" + this.server
            + ";licenseServer=" + this.licenseServer
            + ";companyDB=" + this.companyDB
            + ";userName=" + this.userName
            + ";password=" + this.password
            + ";dbUserName=" + this.dbUserName
            + ";dbPassword=" + this.dbPassword
            + ";dbServerType=" + this.dbServerType
            + ";language=" + this.language
            + ";useTrusted=" + this.useTrusted
            +";";

        /*return "server=" + obj.server
            + ";licenseServer=" + obj.licenseServer
            + ";companyDB=" + obj.companyDB
            + ";userName=" + obj.userName
            + ";password=" + obj.password
            + ";dbUserName=" + obj.dbUserName
            + ";dbPassword=" + obj.dbPassword
            + ";dbServerType=" + obj.dbServerType
            + ";language=" + obj.language
            + ";useTrusted=" + obj.useTrusted
            +";";*/
    }

    public convertToObject(cadena: string) {
        let obj: DatosConexionSAP = new DatosConexionSAP();
        let array = cadena.split(';');
        array.forEach(p => {
            if (p.search("server") == 0) this.server = p.substring(p.indexOf("server=") + "server=".length);
            else if (p.search("licenseServer") == 0) this.licenseServer = p.substring(p.indexOf("licenseServer=") + "licenseServer=".length);
            else if (p.search("companyDB") == 0) this.companyDB = p.substring(p.indexOf("companyDB=") + "companyDB=".length);
            else if (p.search("userName") == 0) this.userName = p.substring(p.indexOf("userName=") + "userName=".length);
            else if (p.search("password") == 0) this.password = p.substring(p.indexOf("password=") + "password=".length);
            else if (p.search("dbUserName") == 0) this.dbUserName = p.substring(p.indexOf("dbUserName=") + "dbUserName=".length);
            else if (p.search("dbPassword") == 0) this.dbPassword = p.substring(p.indexOf("dbPassword=") + "dbPassword=".length);
            else if (p.search("dbServerType") == 0) this.dbServerType = p.substring(p.indexOf("dbServerType=") + "dbServerType=".length);
            else if (p.search("language") == 0) this.language = p.substring(p.indexOf("language=") + "language=".length);
            else if (p.search("useTrusted") == 0) this.useTrusted = p.substring(p.indexOf("useTrusted=") + "useTrusted=".length);
            /*
            if (p.search("server") == 0) obj.server = p.substring(p.indexOf("server=") + "server=".length);
            else if (p.search("licenseServer") == 0) obj.licenseServer = p.substring(p.indexOf("licenseServer=") + "licenseServer=".length);
            else if (p.search("companyDB") == 0) obj.companyDB = p.substring(p.indexOf("companyDB=") + "companyDB=".length);
            else if (p.search("userName") == 0) obj.userName = p.substring(p.indexOf("userName=") + "userName=".length);
            else if (p.search("password") == 0) obj.password = p.substring(p.indexOf("password=") + "password=".length);
            else if (p.search("dbUserName") == 0) obj.dbUserName = p.substring(p.indexOf("dbUserName=") + "dbUserName=".length);
            else if (p.search("dbPassword") == 0) obj.dbPassword = p.substring(p.indexOf("dbPassword=") + "dbPassword=".length);
            else if (p.search("dbServerType") == 0) obj.dbServerType = p.substring(p.indexOf("dbServerType=") + "dbServerType=".length);
            else if (p.search("language") == 0) obj.language = p.substring(p.indexOf("language=") + "language=".length);
            else if (p.search("useTrusted") == 0) obj.useTrusted = p.substring(p.indexOf("useTrusted=") + "useTrusted=".length);
            */
        });
        // return obj;
    }
}