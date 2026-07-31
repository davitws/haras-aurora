/**
 * Haras Aurora — aprimoramentos de interação e acessibilidade.
 *
 * Os modais continuam funcionando por CSS com o seletor :target.
 * Este arquivo adiciona comportamentos complementares sem alterar o layout:
 * - fechamento pela tecla Escape;
 * - bloqueio da rolagem da página enquanto um modal está aberto;
 * - atualização do atributo aria-hidden;
 * - retorno do foco ao card que abriu o modal.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    /** Seletores utilizados pelos modais dos cavalos. */
    const modalSelector = '.cavalo-modal';
    const cardSelector = '.cavalo-card';
    const modals = [...document.querySelectorAll(modalSelector)];
    const cards = [...document.querySelectorAll(cardSelector)];

    /** Armazena o último card acionado para restaurar o foco ao fechar. */
    let lastTrigger = null;

    /**
     * Retorna o modal correspondente ao hash atual da URL.
     * @returns {HTMLElement|null}
     */
    const getActiveModal = () => {
        const hash = window.location.hash;

        if (!hash.startsWith('#cavalo-')) {
            return null;
        }

        return document.querySelector(hash);
    };

    /**
     * Sincroniza acessibilidade e rolagem com o modal atualmente aberto.
     */
    const updateModalState = () => {
        const activeModal = getActiveModal();

        modals.forEach((modal) => {
            const isActive = modal === activeModal;
            modal.setAttribute('aria-hidden', String(!isActive));
        });

        document.body.classList.toggle('modal-aberto', Boolean(activeModal));

        if (activeModal) {
            activeModal.querySelector('.cavalo-modal-fechar')?.focus();
        } else {
            lastTrigger?.focus();
        }
    };

    /** Registra qual card iniciou a abertura do modal. */
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            lastTrigger = card;
        });
    });

    /** Permite fechar qualquer modal com a tecla Escape. */
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && getActiveModal()) {
            window.location.hash = 'cavalos';
        }
    });

    /** Atualiza o estado sempre que o hash da página mudar. */
    window.addEventListener('hashchange', updateModalState);

    /** Define o estado inicial ao carregar a página. */
    updateModalState();
});
