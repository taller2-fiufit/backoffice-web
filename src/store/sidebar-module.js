export const sidebar = {
    namespaced: true,
    state: {
        sideBarOpen: true
    },
    mutations: {
        togglesidebar(state) {
            state.sideBarOpen = !state.sideBarOpen
        }
    },
    actions: {
        togglesidebar({ commit }) {
          commit('togglesidebar')
        }
      }
}