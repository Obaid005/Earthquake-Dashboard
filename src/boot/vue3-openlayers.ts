import { boot } from 'quasar/wrappers';
import { Map, Layers, Sources, Interactions } from 'vue3-openlayers';

export default boot(({ app }) => {
  app.use(Map);
  app.use(Layers);
  app.use(Sources);
  app.use(Interactions);
});

