import * as express from "express"
import { EvanDIDResolver, EvanDIDDocument, EvanSidetreeDidDocument } from "@evan.network/did-resolver";


const resolverTestcore = new EvanDIDResolver("https://testcore.evan.network/did/");
const resolverCore = new EvanDIDResolver("https://core.evan.network/did/");
const resolverSidetree = new EvanDIDResolver("https://sidetree.evan.network/3.0/identifiers/");
const PORT = 8080;

const app = express();
app.get('/1.0/identifiers/:did', async (req, res) => {
  let didDocument: EvanDIDDocument | EvanSidetreeDidDocument;
  try {
    if (!/:0x[^:]+$/.test(req.params.did)) {
      didDocument = await resolverSidetree.resolveDid(req.params.did);
    } else if (req.params.did.startsWith('did:evan:testcore:')) {
      didDocument = await resolverTestcore.resolveDid(req.params.did);
    } else if (req.params.did.startsWith('did:evan:0x')) {
      didDocument = await resolverCore.resolveDid(req.params.did);
    }

    if (didDocument) {
      res.send(didDocument);
    } else {
      res.sendStatus(404);
    }
  } catch(e) {
    console.log(`error fetching did document ${e.message}`);
    res.sendStatus(404);
  }
});

app.listen(PORT, function () {
  console.log(`evan.network Resolver driver active on port ${ PORT }...`);
});
