
switch (HOST) {
    case 'gta3_unreal':
        CLEO.runScript('./modules/iii/index[fs][mem].ts');
        break;
    case 'vc_unreal':
        CLEO.runScript('./modules/vc/index[fs][mem].ts');
        break;
    case 'sa_unreal':
        CLEO.runScript('./modules/sa/index[fs].ts');
        break;
    default:
        exit('Game not supported');
}
