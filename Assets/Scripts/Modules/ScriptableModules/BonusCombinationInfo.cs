using UnityEngine;
using System;
using Utility;

namespace ChestGame.Game.Module.ScriptableModule
{
    [CreateAssetMenu(fileName = "BonusCombination")]
    public class BonusCombinationInfo : ScriptableObjectWithGuid
    {
        [SerializeField] internal int DaysToHolder;
        [SerializeField] internal int HourseToHolder;
        [SerializeField] internal int MinuteToHolder;
        [SerializeField] internal int SecondToHolder;

        [SerializeField] internal Combination Combination;

        internal DateTime TimeToHolder;

        public BonusCombinationInfo()
        {
            TimeToHolder = new DateTime();
            TimeToHolder = TimeToHolder.AddSeconds(SecondToHolder);
            TimeToHolder = TimeToHolder.AddMinutes(MinuteToHolder);
            TimeToHolder = TimeToHolder.AddHours(HourseToHolder);
            TimeToHolder = TimeToHolder.AddDays(DaysToHolder);
        }
    }
}
