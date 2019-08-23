<script>
import { mixins } from 'temii-lib-skins'
import api from '../../../../api/menu'
export default {
  mixins: [mixins.select],
  data () {
    return {
      action: api.getTargetSelect
    }
  }
}
</script>
