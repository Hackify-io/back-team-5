import routerx from 'express-promise-router';
import CampaignController from '../controller/CampaignController';


const router = routerx();

router.route('/')
.get(CampaignController.getCampaigns)
.post(CampaignController.createCampaign);

router.route('/:id')
.get(CampaignController.getCampaign)
.delete(CampaignController.deleteCampaign)
.put(CampaignController.updateCampaign);

export default router;