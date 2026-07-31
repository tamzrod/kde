# AnchorAgreement

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:46.543965Z
**Run ID**: RUN-036
**Seed**: 1700000036

---

## Architecture

- Architecture: centralized_leader
- Node Type: uniform
- Quorum Type: flexible

## Leader Election

- Method: term_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: True

## Voting

- Model: write_quorum
- Vote Granting: grant_if_no_voted
- Vote Revocations: False

## Log Replication

- Type: value_log
- Structure: linked_list
- Commit Method: pipeline_commit

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: leader_change

## Membership

- Model: joint_consensus
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: swim_like
- Model: crash_recovery

## Timing

- Timeout Model: adaptive
- Heartbeat Interval: 477ms
- Election Timeout Base: 407ms
- Election Timeout Range: 75ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- term_update

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:term_based
- concept:term_epochs
- concept:randomized_timeout
- concept:lease_based_leadership
- voting:write_quorum
- vote_granting:grant_if_no_voted
- log:value_log
- log_structure:linked_list
- commit:pipeline_commit
- recovery:hybrid_recovery
- snapshot:leader_change
- dynamic_membership:joint_consensus
- failure_detection:swim_like

---

## Simulation Results

### 3 Nodes

- Election Attempts: 52
- Elections Succeeded: 40
- Election Success Rate: 76.92%
- Messages Sent: 164
- Commits: 15
- Avg Messages/Commit: 10.93
- Leader Changes: 40
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 65
- Elections Succeeded: 61
- Election Success Rate: 93.85%
- Messages Sent: 359
- Commits: 27
- Avg Messages/Commit: 13.30
- Leader Changes: 61
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 57
- Elections Succeeded: 56
- Election Success Rate: 98.25%
- Messages Sent: 456
- Commits: 27
- Avg Messages/Commit: 16.89
- Leader Changes: 56
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 62
- Elections Succeeded: 54
- Election Success Rate: 87.10%
- Messages Sent: 475
- Commits: 26
- Avg Messages/Commit: 18.27
- Leader Changes: 54
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

