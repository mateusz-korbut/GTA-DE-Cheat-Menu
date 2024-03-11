export const CONFIG_PATH = `${__dirname}/config.ini`;

switch (HOST) {
    case 'gta3_unreal':
        CLEO.runScript('./modules/iii/index[fs].ts');
        break;
    case 'vc_unreal':
        CLEO.runScript('./modules/vc/index[fs].ts');
        break;
    case 'sa_unreal':
        CLEO.runScript('./modules/sa/index[fs].ts');
        break;
    default:
        exit('Game not supported');
}
