import Vue from 'vue';
/**
 * 事件总线
 * @usage:
 * EventBus.$emit('event',payload);
 * EventBus.$on('on',(payload)=>{});
 */
const EventBus = new Vue();
export default EventBus