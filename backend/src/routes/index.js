import routerx from 'express-promise-router';
import Campaign from './CampaignRoute';

const router = routerx();

router.use('/campaign', Campaign);

export default router;