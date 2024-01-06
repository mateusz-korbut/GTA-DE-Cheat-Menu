switch (HOST) {
    case 'gta3_unreal':
        CLEO.runScript('./modules/iii/index.ts');
        break;
    case 'vc_unreal':
        CLEO.runScript('./modules/vc/index.ts');
        break;
    case 'sa_unreal':
        CLEO.runScript('./modules/sa/index.ts');
        break;
    default:
        exit('Game not supported');
}
