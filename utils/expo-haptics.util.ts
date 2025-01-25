import * as Haptics from "expo-haptics";

export namespace HapticsUtil {
    // Notification Feedback
    export const successAsync = async () =>
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    export const errorAsync = async () =>
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

    export const warningAsync = async () =>
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

    // Impact Feedback
    export const lightImpactAsync = async () =>
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    export const mediumImpactAsync = async () =>
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    export const heavyImpactAsync = async () =>
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    export const rigidImpactAsync = async () =>
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);

    export const softImpactAsync = async () =>
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

    // Selection Feedback
    export const selectionAsync = async () => Haptics.selectionAsync();
}
