const adsSdk = require('facebook-nodejs-business-sdk');
const accessToken = 'EAACUVcv1q9QBALXB5IqMNoEDS3ZCfP4rTYZAqAcoh6xDI4PSlo3ZCegGKj5ZBZA3KDFBzFrCsHsphWGvg9uzIj9ZAykzbA3cM07tdfFsALprxZAHAkcK28fqavUfil3xDLvv1qSQxPWUmS6ZCv27Ef2eZAFzXQoiMduaqw1yZBMjaTevlFyQrq5FZCGYvKjdLCa00nSF0rLLveB8xleheQdId2Q';
const api = adsSdk.FacebookAdsApi.init(accessToken);
const AdAccount = adsSdk.AdAccount;
const Campaign = adsSdk.Campaign;
const account = new AdAccount('act_290660258559648');


export default {
    createCampaign: async (req, res, next) => {
        try {

            const { name, status, objective, special_ad_category, daily_budget, start_time } = req.body;
            account
                .createCampaign(
                    [Campaign.Fields.name],
                    {
                        [Campaign.Fields.name]: name,
                        [Campaign.Fields.status]: status,
                        [Campaign.Fields.objective]: objective,
                        [Campaign.Fields.special_ad_category]: special_ad_category,
                        [Campaign.Fields.daily_budget]: daily_budget,
                        [Campaign.Fields.start_time]: start_time
                    }
                )
                .then((result) => {
                    console.log("todo bien...");
                    console.log(result);
                    res.status(200).send(result);
                })
                .catch((error) => {
                    console.log("error=>" + error);
                    res.status(500).send(error);
                });


        } catch (e) {
            res.status(500).send({
                message: e.message
            });
            next(e);
        }
    },
    getCampaigns: async (req, res, next) => {
        try {
            let campaigns = await account.getCampaigns([
                Campaign.Fields.id,
                Campaign.Fields.name,
                Campaign.Fields.status,
                Campaign.Fields.objective,
                Campaign.Fields.special_ad_category,
                Campaign.Fields.daily_budget,
                Campaign.Fields.start_time
            ],
                { limit: 20 });
            campaigns.forEach(c => console.log(c.id));
            while (campaigns.hasNext()) {
                campaigns = await campaigns.next();
            }
            res.status(200).json(campaigns);
        } catch (e) {
            res.status(500).send({
                message: e
            });
            next(e);
        }
    },
    getCampaign: async (req, res, next) => {
        try {
            const id = req.params.id;
            let campaign;
            let campaigns = await account.getCampaigns([
                Campaign.Fields.id,
                Campaign.Fields.name,
                Campaign.Fields.status,
                Campaign.Fields.objective,
                Campaign.Fields.special_ad_category,
                Campaign.Fields.daily_budget,
                Campaign.Fields.start_time
            ],
                { limit: 20 });
            campaigns.forEach(c => console.log(c.id));
            while (campaigns.hasNext()) {
                campaigns = await campaigns.next();
            }

            campaigns.forEach(c => {
                if(c.id === id) {
                    campaign = c;
                }
            });
            console.log("->"+campaign);
            res.status(200).json(campaign);
        } catch (e) {
            res.status(500).send({
                message: e
            });
            next(e);
        }
    },
    updateCampaign: async (req, res, next) => {
        try {
            const campaignId = req.params.id;
            const { name, status, objective, special_ad_category, daily_budget, start_time } = req.body;
            new Campaign(campaignId, {
                [Campaign.Fields.name]: name,
                [Campaign.Fields.status]: status,
                [Campaign.Fields.objective]: objective,
                [Campaign.Fields.special_ad_category]: special_ad_category,
                [Campaign.Fields.daily_budget]: daily_budget,
                [Campaign.Fields.start_time]: start_time
            })
            .update();
            res.status(200).json(req.body);
        } catch (e) {
            res.status(500).send({
                message: e
            });
            next(e);
        }
    },
    deleteCampaign: async (req, res, next) => {
        try {
            const campaignId = req.params.id;
            new Campaign(campaignId).delete();
            console.log(campaignId);
            res.status(200).send({ message: "ok" });
        } catch (e) {
            res.status(500).send({
                message: e
            });
            next(e);
        }
    }
}