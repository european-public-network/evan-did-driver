import * as express from "express"
import { EvanDIDResolver, EvanDIDDocument } from "@evan.network/did-resolver";


const resolver = new EvanDIDResolver("https://testcore.evan.network/did/");
const did = "did:evan:testcore:0x126E901F6F408f5E260d95c62E7c73D9B60fd734";
const PORT = 8080;

const app = express();
app.get('/1.0/identifiers/:did', async (req, res) => {

  const didDocument: EvanDIDDocument = await resolver.resolveDid(did);
  if (didDocument)
    res.send(didDocument);
  else
    res.sendStatus(404)
});

app.listen(PORT, function () {
  console.log(`evan.network Resolver driver active on port ${ PORT }...`)
});