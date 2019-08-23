<script>
import { mixins } from 'temii-lib-skins'
import api from '../../../../api/role'
export default {
  mixins: [mixins.select],
  data () {
    return {
      action: api.select
    }
  }
}
</script>
