import { environment } from '../../environments/environment';

export class AppConfig {

    private static StateUrl = 'https://mapservice.gov.in/gismapservice/rest/services/BharatMapService/State_Boundary/MapServer/0?Token=V1mN3NZBXUkW6kmZmJMTRN3P8w7AQx8Ouu6nCInegv2HXLGKR-2lpzeeziDhA2qV';

    private static DistrictUrl = 'https://mapservice.gov.in/gismapservice/rest/services/BharatMapService/District_Boundary/MapServer/0?Token=pcif67ocy9RQD6jpoxvFy-B9JJEb1uzdsdI6LmlM_pAOogrI_qH0sIQQBMSfukVc';


    private static BlockUrl='https://mapservice.gov.in/gismapservice/rest/services/BharatMapService/Block_Boundary/MapServer/0?Token=86R8qoxcozGlfUkeEBAKdcgqKxXVjs8suw8AX7JzeWcB_EbHHgjA5XpFZ97KrGtF';


    private static uiUrlPath: string = environment.uiUrl;

    public static getUiUrlPath(): string {

        return AppConfig.uiUrlPath;
    }

    public static getStateUrl(): string {

        return AppConfig.StateUrl;
    }

    public static getDistrictUrl(): string {
        return AppConfig.DistrictUrl;
    }

    public static getBlockUrl():string {
        return AppConfig.BlockUrl;
    }


}