<script>
import { mixins } from 'temii-lib-skins'
import api from '../../../../api/moduleInfo'
export default {
  mixins: [mixins.select],
  data () {
    return {
      action: api.select
    }
  }
}
</script>
