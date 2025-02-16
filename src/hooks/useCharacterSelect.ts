import { useState, useCallback } from "react";
import { PersonalityType, CustomCharacter } from "@/types/character";

export const useCharacterSelect = () => {
    const [showModal, setShowModal] = useState(true);
    const [selectedPersonality, setSelectedPersonality] =
        useState<PersonalityType>("ツンデレ妹");
    const [customCharacter, setCustomCharacter] =
        useState<CustomCharacter | null>(null);

    const handleCharacterSelect = useCallback(
        (personality: PersonalityType, customData?: CustomCharacter) => {
            setSelectedPersonality(personality);
            if (customData) {
                setCustomCharacter(customData);
            }
            setShowModal(false);
        },
        []
    );

    return {
        showModal,
        selectedPersonality,
        customCharacter,
        handleCharacterSelect,
        setShowModal,
    };
};
